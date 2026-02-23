import type { VueLanguagePlugin } from '@vue/language-core'
import { SlimeParser, SlimeCstToAstUtils } from 'slime-parser'
import { SlimeGenerator, SlimeMappingConverter } from 'slime-generator'
import Glog from 'glogjs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'

// version
const PLUGIN_VERSION = '1.0.8-precise-multi-segment'
const require = createRequire(import.meta.url)

// 鍒濆鍖?Glog
Glog.init({ level: 'debug' })
Glog.info(`[language-plugin-testts v${PLUGIN_VERSION}] initialized`)

function findPackageJsonPath(entryFilePath: string): string | null {
    let current = dirname(entryFilePath)
    while (true) {
        const candidate = join(current, 'package.json')
        if (existsSync(candidate)) {
            return candidate
        }
        const parent = dirname(current)
        if (parent === current) {
            return null
        }
        current = parent
    }
}

function readPackageMeta(packageName: string): { version: string, entryPath: string } {
    try {
        const entryPath = require.resolve(packageName)
        const packageJsonPath = findPackageJsonPath(entryPath)
        if (!packageJsonPath) {
            return { version: 'unknown', entryPath }
        }
        const pkgText = readFileSync(packageJsonPath, 'utf8')
        const pkg = JSON.parse(pkgText)
        return {
            version: pkg?.version ?? 'unknown',
            entryPath
        }
    } catch {
        return { version: 'unresolved', entryPath: 'unresolved' }
    }
}

function formatPackageMeta(packageName: string): string {
    const meta = readPackageMeta(packageName)
    return `${packageName}=${meta.version} (${meta.entryPath})`
}

function extractErrorCodeIndex(errorMessage: string): number | null {
    const match = /position\s+(\d+)/i.exec(errorMessage)
    if (!match) {
        return null
    }
    const parsed = Number(match[1])
    return Number.isFinite(parsed) ? parsed : null
}

function getSnippetAround(sourceCode: string, index: number, radius: number = 25): string {
    const start = Math.max(0, index - radius)
    const end = Math.min(sourceCode.length, index + radius)
    return sourceCode.slice(start, end).replace(/\r?\n/g, '\\n')
}

function buildIdentityFallbackContent(
    embeddedFile: any,
    scriptBlock: any,
    sourceCode: string,
    reason: string
): void {
    const features = {
        verification: true,
        completion: true,
        semantic: true,
        navigation: true,
        structure: true,
        format: true,
    }
    embeddedFile.content.length = 0
    embeddedFile.content.push([
        sourceCode,
        scriptBlock.name,
        0,
        features
    ])
    Glog.warn(`[testts] Fallback to identity mapping. reason=${reason}, sourceLength=${sourceCode.length}`)
}

function calcMappedCoverage(mappings: any[], generatedLength: number): number {
    if (generatedLength <= 0) return 0
    let covered = 0
    for (const m of mappings) {
        const g = m?.generate
        if (!g || typeof g.length !== 'number') continue
        covered += Math.max(0, g.length)
    }
    return Math.min(1, covered / generatedLength)
}


/**
 * 浣跨敤 slime-parser 鍜?slime-generator 杞崲浠ｇ爜
 * 妯℃嫙 cssts 鐨?transformCssTs() 娴佺▼
 */
function transformTestTs(code: string) {
    // 1. 浣跨敤 SlimeParser 瑙ｆ瀽浠ｇ爜
    const parser = new SlimeParser(code)
    const cst = parser.Program()

    // 2. CST 杞崲涓?AST锛堜娇鐢?toProgram 鏂规硶锛?
    const ast = SlimeCstToAstUtils.toProgram(cst)

    // 3. 鑾峰彇瑙ｆ瀽鍚庣殑 tokens
    const tokens = parser.parsedTokens

    // 4. 浣跨敤 SlimeGenerator 鐢熸垚浠ｇ爜
    const result = SlimeGenerator.generator(ast, tokens)

    // 5. 杩囨护鏃犳晥鐨?mapping
    const mapping = result.mapping.filter(
        (m: any) => m.source && m.generate && m.source.length > 0
    )

    return {
        code: result.code,
        mapping
    }
}

/**
 * 娴嬭瘯鐢?Vue Language Plugin
 * 浣跨敤 slime-parser + slime-generator 瑙ｆ瀽鍜岀敓鎴愪唬鐮?
 * 鍗曚釜 segment 杈撳嚭
 */
const plugin: VueLanguagePlugin = ({ modules }) => {
    const ts = modules.typescript

    Glog.info(`[language-plugin-testts] Plugin loaded, TypeScript version: ${ts?.version || 'unknown'}`)
    Glog.info(
        `[language-plugin-testts] Runtime deps: ` +
        `${formatPackageMeta('slime-parser')}, ` +
        `${formatPackageMeta('slime-generator')}, ` +
        `${formatPackageMeta('subhuti')}`
    )

    return {
        name: 'language-plugin-testts',
        version: 2.2,

        getEmbeddedCodes(fileName, sfc) {
            Glog.filePath = fileName
            Glog.debug(`[testts] getEmbeddedCodes: ${fileName}`)

            const scriptBlock = sfc.scriptSetup || sfc.script
            if (scriptBlock) {
                Glog.debug(`[testts] Script lang: "${scriptBlock.lang}", length: ${scriptBlock.content.length}`)
            }
            return []
        },

        resolveEmbeddedCode(fileName, sfc, embeddedFile) {
            Glog.debug(`[testts] resolveEmbeddedCode: id="${embeddedFile.id}"`)

            if (embeddedFile.id === 'script_ts' || embeddedFile.id === 'scriptsetup_raw') {
                const scriptBlock = sfc.scriptSetup || sfc.script

                if (scriptBlock && scriptBlock.lang === 'testts') {
                    Glog.info(`[testts] 鉁?Found testts script block! length: ${scriptBlock.content.length}`)

                    try {
                        const sourceCode = scriptBlock.content

                        // 浣跨敤 slime-parser + slime-generator 杞崲浠ｇ爜
                        const result = transformTestTs(sourceCode)
                        const tsCode = result.code
                        const offsets = SlimeMappingConverter.convertMappings(result.mapping)
                        const mappingCoverage = calcMappedCoverage(result.mapping, tsCode.length)
                        Glog.debug(`[testts] mapping coverage(generate): ${(mappingCoverage * 100).toFixed(1)}%`)

                        Glog.debug(`[testts] 婧愮爜闀垮害: ${sourceCode.length}, 鐢熸垚鐮侀暱搴? ${tsCode.length}`)
                        Glog.debug(`[testts] 闀垮害宸紓: ${sourceCode.length - tsCode.length}`)
                        Glog.debug(`[testts] mapping 鏁伴噺: ${offsets.length}`)
                        Glog.debug(`[testts] 婧愮爜 === 鐢熸垚鐮? ${sourceCode === tsCode}`)

                        // 鎵撳嵃鍓?涓?mapping 璇︾粏淇℃伅
                        Glog.debug(`[testts] === Mapping 璇︽儏 (鍓?涓? ===`)
                        for (let i = 0; i < Math.min(5, result.mapping.length); i++) {
                            const m = result.mapping[i]
                            Glog.debug(`[testts] mapping[${i}]: source=[${m.source?.index}, len=${m.source?.length}] -> generate=[${m.generate?.index}, len=${m.generate?.length}]`)
                        }

                        // 鎵撳嵃婧愮爜鍜岀敓鎴愮爜瀵规瘮锛堝墠100瀛楃锛?
                        Glog.debug(`[testts] 婧愮爜鍓?00: ${JSON.stringify(sourceCode.substring(0, 100))}`)
                        Glog.debug(`[testts] 鐢熸垚鍓?00: ${JSON.stringify(tsCode.substring(0, 100))}`)

                        // 娓呯┖鐜版湁鍐呭
                        if (!result.mapping.length) {
                            buildIdentityFallbackContent(
                                embeddedFile,
                                scriptBlock,
                                sourceCode,
                                'transform returned empty mapping'
                            )
                            return
                        }
                        embeddedFile.content.length = 0

                        // 鍚敤鎵€鏈夎瑷€鍔熻兘
                        const features = {
                            verification: true,
                            completion: true,
                            semantic: true,
                            navigation: true,
                            structure: true,
                            format: true,
                        }

                        const sortedOffsets = [...offsets]
                            .filter(m => m.generated.length > 0 && m.original.length > 0)
                            .sort((a, b) => a.generated.offset - b.generated.offset)

                        let lastGenEnd = 0
                        let mappedSegments = 0

                        for (const m of sortedOffsets) {
                            const genStart = m.generated.offset
                            const genEnd = m.generated.offset + m.generated.length
                            const srcStart = m.original.offset

                            if (genStart > lastGenEnd) {
                                const gapText = tsCode.slice(lastGenEnd, genStart)
                                if (gapText) {
                                    embeddedFile.content.push(gapText)
                                }
                            }

                            const code = tsCode.slice(genStart, genEnd)
                            if (code) {
                                embeddedFile.content.push([code, scriptBlock.name, srcStart, features])
                                mappedSegments++
                            }

                            lastGenEnd = Math.max(lastGenEnd, genEnd)
                        }

                        if (lastGenEnd < tsCode.length) {
                            const tailText = tsCode.slice(lastGenEnd)
                            if (tailText) {
                                embeddedFile.content.push(tailText)
                            }
                        }

                        Glog.info(
                            `[testts] Created ${embeddedFile.content.length} segments; ` +
                            `mappedSegments=${mappedSegments}, mode=precise-multi-segment, ` +
                            `coverage=${(mappingCoverage * 100).toFixed(1)}%`
                        )
                    } catch (e: any) {
                        const message = e?.message || String(e)
                        Glog.error(`[testts] Transform error: ${message}`)
                        if (e?.stack) {
                            Glog.error(`[testts] Transform stack: ${e.stack}`)
                        }
                        const failedCodeIndex = extractErrorCodeIndex(message)
                        if (failedCodeIndex !== null) {
                            Glog.warn(
                                `[testts] Transform failed around codeIndex=${failedCodeIndex}, ` +
                                `snippet="${getSnippetAround(scriptBlock.content, failedCodeIndex)}"`
                            )
                        }
                        buildIdentityFallbackContent(
                            embeddedFile,
                            scriptBlock,
                            scriptBlock.content,
                            'transform exception'
                        )
                    }
                }
            }
        },
    }
}

export default plugin

