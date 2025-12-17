/**
 * 一致性验证脚本
 * 
 * 对比新版本（预生成数据）和旧版本（css-tree 动态获取）的生成结果
 * 
 * 运行方式：npx tsx scripts/verify-consistency.ts
 */

import { generateAtoms } from '../src/generator/atom-generator.js'
import { generateAtomsLegacy } from '../src/generator/atom-generator-legacy.js'
import { defaultConfig } from '../src/generator/config.js'

interface DiffResult {
  onlyInNew: string[]
  onlyInLegacy: string[]
  different: Array<{
    name: string
    newValue: any
    legacyValue: any
  }>
}

function compareAtoms(): DiffResult {
  console.log('Generating atoms with new version (pre-generated data)...')
  const newAtoms = generateAtoms(defaultConfig)
  console.log(`  New version: ${newAtoms.length} atoms`)

  console.log('Generating atoms with legacy version (css-tree)...')
  const legacyAtoms = generateAtomsLegacy(defaultConfig)
  console.log(`  Legacy version: ${legacyAtoms.length} atoms`)

  // 创建 Map 方便查找
  const newMap = new Map(newAtoms.map(a => [a.name, a]))
  const legacyMap = new Map(legacyAtoms.map(a => [a.name, a]))

  const result: DiffResult = {
    onlyInNew: [],
    onlyInLegacy: [],
    different: [],
  }

  // 检查新版本中有但旧版本没有的
  for (const [name, atom] of newMap) {
    if (!legacyMap.has(name)) {
      result.onlyInNew.push(name)
    }
  }

  // 检查旧版本中有但新版本没有的
  for (const [name, atom] of legacyMap) {
    if (!newMap.has(name)) {
      result.onlyInLegacy.push(name)
    }
  }

  // 检查两者都有但值不同的
  for (const [name, newAtom] of newMap) {
    const legacyAtom = legacyMap.get(name)
    if (legacyAtom) {
      if (
        newAtom.className !== legacyAtom.className ||
        newAtom.property !== legacyAtom.property ||
        newAtom.value !== legacyAtom.value
      ) {
        result.different.push({
          name,
          newValue: newAtom,
          legacyValue: legacyAtom,
        })
      }
    }
  }

  return result
}

function main() {
  console.log('='.repeat(60))
  console.log('Consistency Verification: New vs Legacy Atom Generator')
  console.log('='.repeat(60))
  console.log()

  const diff = compareAtoms()

  console.log()
  console.log('='.repeat(60))
  console.log('Results:')
  console.log('='.repeat(60))

  if (diff.onlyInNew.length === 0 && diff.onlyInLegacy.length === 0 && diff.different.length === 0) {
    console.log()
    console.log('✅ PASSED: New and legacy versions produce identical results!')
    console.log()
    return
  }

  console.log()
  console.log(`❌ DIFFERENCES FOUND:`)
  console.log()

  if (diff.onlyInNew.length > 0) {
    console.log(`Only in NEW version (${diff.onlyInNew.length}):`)
    for (const name of diff.onlyInNew.slice(0, 20)) {
      console.log(`  - ${name}`)
    }
    if (diff.onlyInNew.length > 20) {
      console.log(`  ... and ${diff.onlyInNew.length - 20} more`)
    }
    console.log()
  }

  if (diff.onlyInLegacy.length > 0) {
    console.log(`Only in LEGACY version (${diff.onlyInLegacy.length}):`)
    for (const name of diff.onlyInLegacy.slice(0, 20)) {
      console.log(`  - ${name}`)
    }
    if (diff.onlyInLegacy.length > 20) {
      console.log(`  ... and ${diff.onlyInLegacy.length - 20} more`)
    }
    console.log()
  }

  if (diff.different.length > 0) {
    console.log(`Different values (${diff.different.length}):`)
    for (const item of diff.different.slice(0, 10)) {
      console.log(`  - ${item.name}:`)
      console.log(`    New:    ${JSON.stringify(item.newValue)}`)
      console.log(`    Legacy: ${JSON.stringify(item.legacyValue)}`)
    }
    if (diff.different.length > 10) {
      console.log(`  ... and ${diff.different.length - 10} more`)
    }
    console.log()
  }

  // 总结
  console.log('='.repeat(60))
  console.log('Summary:')
  console.log(`  Only in new:    ${diff.onlyInNew.length}`)
  console.log(`  Only in legacy: ${diff.onlyInLegacy.length}`)
  console.log(`  Different:      ${diff.different.length}`)
  console.log('='.repeat(60))
}

main()
