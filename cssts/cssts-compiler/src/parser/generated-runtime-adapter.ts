function javaListToArray<T = any>(list: any): T[] {
  if (!list) return []
  if (Array.isArray(list)) return list as T[]
  if (Array.isArray(list.__items)) return list.__items as T[]
  if (typeof list.size === 'function' && typeof list.get === 'function') {
    const result: T[] = []
    for (let i = 0; i < list.size(); i++) {
      result.push(list.get(i))
    }
    return result
  }
  if (typeof list.size === 'number' && typeof list.get === 'function') {
    const result: T[] = []
    for (let i = 0; i < list.size; i++) {
      result.push(list.get(i))
    }
    return result
  }
  if (typeof list[Symbol.iterator] === 'function') {
    return Array.from(list) as T[]
  }
  return []
}

function readPosition(position: any): any {
  if (!position) return undefined
  const line = typeof position.getLine === 'function'
    ? position.getLine()
    : (typeof position.line === 'function' ? position.line() : position.line)
  const column = typeof position.getColumn === 'function'
    ? position.getColumn()
    : (typeof position.column === 'function' ? position.column() : position.column)
  const index = typeof position.getIndex === 'function'
    ? position.getIndex()
    : (typeof position.index === 'function' ? position.index() : position.index)
  if (line === undefined || line === null || column === undefined || column === null || index === undefined || index === null) {
    return undefined
  }
  return { line, column, index }
}

function normalizeGeneratedLocation(location: any, value?: string, type?: string): any {
  if (!location) return undefined
  const existingStart = typeof location.start === 'function' ? location.start() : location.start
  const existingEnd = typeof location.end === 'function' ? location.end() : location.end
  const start = readPosition(typeof location.getStart === 'function' ? location.getStart() : existingStart)
  const end = readPosition(typeof location.getEnd === 'function' ? location.getEnd() : existingEnd)
  if (!start || !end) return undefined
  const rawValue = typeof location.getValue === 'function'
    ? location.getValue()
    : (typeof location.value === 'function' ? location.value() : location.value)
  const rawType = typeof location.getType === 'function'
    ? location.getType()
    : (typeof location.type === 'function' ? location.type() : location.type)
  return {
    type: rawType ?? type,
    value: rawValue ?? value,
    newLine: typeof location.getNewLine === 'function'
      ? location.getNewLine()
      : (typeof location.newLine === 'function' ? location.newLine() : location.newLine),
    index: start.index,
    length: Math.max(0, end.index - start.index),
    start,
    end,
    filename: typeof location.getFilename === 'function'
      ? location.getFilename()
      : (typeof location.filename === 'function' ? location.filename() : location.filename),
    identifierName: typeof location.getIdentifierName === 'function'
      ? location.getIdentifierName()
      : (typeof location.identifierName === 'function' ? location.identifierName() : location.identifierName)
  }
}

function unwrapAccessorDescriptorValue(value: any, receiver?: any): any {
  let current = value
  for (let depth = 0; depth < 8; depth++) {
    if (current === null || current === undefined || typeof current !== 'object') return current
    if ((current as any).__qin_accessor_descriptor !== true) return current
    const storedValue = (current as any).value
    if (storedValue !== null && storedValue !== undefined && !isDescriptorText(storedValue)) {
      return storedValue
    }
    const getter = (current as any).get
    if (typeof getter !== 'function') return undefined
    current = receiver === undefined ? getter() : getter.call(receiver)
  }
  return current
}

function isDescriptorText(value: any): boolean {
  return typeof value === 'string' && value.startsWith('{__qin_accessor_descriptor=')
}

function readStaticMemberValue(member: any, receiver: any, fallback?: any): any {
  if (member !== undefined && typeof member !== 'function') return member
  if (typeof member === 'function') return member.call(receiver)
  return fallback
}

export function normalizeGeneratedToken(token: any): any {
  if (!token || token.__csstsLegacyToken === true) return token
  const tokenName = typeof token.getTokenName === 'function' ? token.getTokenName() : (typeof token.tokenName === 'function' ? token.tokenName() : token.tokenName)
  const tokenValue = typeof token.getTokenValue === 'function' ? token.getTokenValue() : (typeof token.tokenValue === 'function' ? token.tokenValue() : token.tokenValue)
  const rowNum = typeof token.getRowNum === 'function' ? token.getRowNum() : (typeof token.rowNum === 'function' ? token.rowNum() : (token.rowNum ?? token.line))
  const columnStartNum = typeof token.getColumnStartNum === 'function' ? token.getColumnStartNum() : (typeof token.columnStartNum === 'function' ? token.columnStartNum() : (token.columnStartNum ?? token.column))
  const columnEndNum = typeof token.getColumnEndNum === 'function' ? token.getColumnEndNum() : (typeof token.columnEndNum === 'function' ? token.columnEndNum() : token.columnEndNum)
  const index = typeof token.getIndex === 'function' ? token.getIndex() : (typeof token.index === 'function' ? token.index() : (token.index ?? token.codeIndex))
  const hasLineBreakBefore = typeof token.hasLineBreakBefore === 'function'
    ? token.hasLineBreakBefore()
    : (typeof token.getHasLineBreakBefore === 'function' ? token.getHasLineBreakBefore() : token.hasLineBreakBefore)

  Object.defineProperties(token, {
    __csstsLegacyToken: { value: true, configurable: true },
    tokenName: { value: tokenName, configurable: true, writable: true },
    tokenValue: { value: tokenValue, configurable: true, writable: true },
    rowNum: { value: rowNum, configurable: true, writable: true },
    line: { value: rowNum, configurable: true, writable: true },
    columnStartNum: { value: columnStartNum, configurable: true, writable: true },
    column: { value: columnStartNum, configurable: true, writable: true },
    columnEndNum: { value: columnEndNum, configurable: true, writable: true },
    index: { value: index, configurable: true, writable: true },
    codeIndex: { value: index, configurable: true, writable: true },
    hasLineBreakBefore: { value: !!hasLineBreakBefore, configurable: true, writable: true }
  })
  return token
}

export function normalizeGeneratedTokens(tokens: any): any[] {
  return javaListToArray(tokens).map(token => normalizeGeneratedToken(token))
}

export function normalizeGeneratedCst<T = any>(cst: T): T {
  if (!cst || typeof cst !== 'object') return cst
  const node: any = cst
  if (node.__csstsLegacyCst === true) return cst
  const originalGetName = typeof node.getName === 'function' ? node.getName.bind(node) : undefined
  const originalGetValue = typeof node.getValue === 'function' ? node.getValue.bind(node) : undefined
  const originalGetChild = typeof node.getChild === 'function' ? node.getChild.bind(node) : undefined
  const originalGetToken = typeof node.getToken === 'function' ? node.getToken.bind(node) : undefined
  const originalGetLoc = typeof node.getLoc === 'function' ? node.getLoc.bind(node) : undefined
  const originalGetLocation = typeof node.getLocation === 'function' ? node.getLocation.bind(node) : undefined
  const readChildrenRaw = () => {
    if (Object.prototype.hasOwnProperty.call(node, '__qin_field_children')) {
      return node.__qin_field_children
    }
    return undefined
  }
  const descriptorFreeValue = (value: any) => {
    const unwrapped = unwrapAccessorDescriptorValue(value, node)
    return isDescriptorText(unwrapped) ? undefined : unwrapped
  }
  const normalizedName = descriptorFreeValue(node.__qin_field_name)
    ?? descriptorFreeValue(originalGetName ? originalGetName() : undefined)
  const normalizedValue = descriptorFreeValue(node.__qin_field_value)
    ?? descriptorFreeValue(originalGetValue ? originalGetValue() : undefined)
  const normalizedChildren = javaListToArray(descriptorFreeValue(readChildrenRaw()))
    .map(child => normalizeGeneratedCst(child))
  const normalizedLoc = normalizeGeneratedLocation(
    descriptorFreeValue(
      originalGetLoc
        ? originalGetLoc()
        : (originalGetLocation ? originalGetLocation() : node.__qin_field_loc)
    ),
    normalizedValue,
    normalizedName
  )

  Object.defineProperties(node, {
    __csstsLegacyCst: { value: true, configurable: true },
    name: {
      value: normalizedName,
      configurable: true,
      enumerable: true,
      writable: true
    },
    value: {
      value: normalizedValue,
      configurable: true,
      enumerable: true,
      writable: true
    },
    loc: {
      value: normalizedLoc,
      configurable: true,
      enumerable: true,
      writable: true
    },
    children: {
      value: normalizedChildren,
      configurable: true,
      enumerable: true,
      writable: true
    }
  })
  Object.defineProperty(node, 'getName', {
    value: () => node.name,
    configurable: true,
    writable: true
  })
  Object.defineProperty(node, 'getValue', {
    value: () => node.value,
    configurable: true,
    writable: true
  })
  const readNormalizedLoc = () => {
    const raw = descriptorFreeValue(
      originalGetLoc
      ? originalGetLoc()
      : (originalGetLocation ? originalGetLocation() : node.__qin_field_loc)
    )
    return normalizeGeneratedLocation(raw, node.value, node.name)
  }
  if (!originalGetLoc) node.getLoc = readNormalizedLoc
  if (!originalGetLocation) node.getLocation = readNormalizedLoc
  Object.defineProperty(node, 'getChildren', {
    value: (name?: string) => {
      const children = node.children
      if (name === undefined) return children
      return children.filter((child: any) => child.name === name)
    },
    configurable: true,
    writable: true
  })
  if (!originalGetChild) {
    node.getChild = (name: string, index = 0) => node.children.filter((child: any) => child.name === name)[index]
  }
  if (!originalGetToken) {
    node.getToken = (tokenName: string) => node.children.find((child: any) => child.name === tokenName && child.value !== undefined && child.value !== null)
  }
  return cst
}

function recordClassSimpleName(value: any): string | undefined {
  const recordName = value?.__qinJavaRecordClass
  if (typeof recordName !== 'string') return undefined
  const dotIndex = recordName.lastIndexOf('.')
  const simpleName = dotIndex >= 0 ? recordName.slice(dotIndex + 1) : recordName
  const nestedIndex = simpleName.lastIndexOf('$')
  return nestedIndex >= 0 ? simpleName.slice(nestedIndex + 1) : simpleName
}

function readGeneratedField(value: any, fieldName: string): any {
  if (!value || typeof value !== 'object') return undefined
  if (fieldName === 'type') {
    return readStaticMemberValue(value.type, value, value.__qin_field_type)
  }
  if (fieldName === 'value') {
    return readStaticMemberValue(value.value, value, value.__qin_field_value)
  }
  if (fieldName === 'location') {
    return readStaticMemberValue(value.location, value, value.__qin_field_location ?? value.__qin_field_loc)
  }
  if (fieldName === 'loc') {
    return readStaticMemberValue(value.loc, value, value.__qin_field_loc ?? value.__qin_field_location)
  }
  if (fieldName === 'kind') {
    return readStaticMemberValue(value.kind, value, value.__qin_field_kind)
  }
  if (fieldName === 'declarations') {
    return readStaticMemberValue(value.declarations, value, value.__qin_field_declarations)
  }
  if (fieldName === 'body') {
    return readStaticMemberValue(value.body, value, value.__qin_field_body)
  }
  if (fieldName === 'params') {
    return readStaticMemberValue(value.params, value, value.__qin_field_params)
  }
  if (fieldName === 'specifiers') {
    return readStaticMemberValue(value.specifiers, value, value.__qin_field_specifiers)
  }
  if (fieldName === 'arguments') {
    return readStaticMemberValue(value.arguments, value, value.__qin_field___qin_arguments ?? value.__qin_field_arguments)
  }
  if (fieldName === 'elements') {
    return readStaticMemberValue(value.elements, value, value.__qin_field_elements)
  }
  if (fieldName === 'properties') {
    return readStaticMemberValue(value.properties, value, value.__qin_field_properties)
  }
  if (fieldName === 'expressions') {
    return readStaticMemberValue(value.expressions, value, value.__qin_field_expressions)
  }
  if (fieldName === 'decorators') {
    return readStaticMemberValue(value.decorators, value, value.__qin_field_decorators)
  }
  if (fieldName === 'typeParameters') {
    return readStaticMemberValue(value.typeParameters, value, value.__qin_field_typeParameters)
  }
  if (fieldName === 'implementsTypes') {
    return readStaticMemberValue(value.implementsTypes, value, value.__qin_field_implementsTypes)
  }
  if (fieldName === 'source') {
    return readStaticMemberValue(value.source, value, value.__qin_field_source)
  }
  if (fieldName === 'imported') {
    return readStaticMemberValue(value.imported, value, value.__qin_field_imported)
  }
  if (fieldName === 'local') {
    return readStaticMemberValue(value.local, value, value.__qin_field_local)
  }
  if (fieldName === 'object') {
    return readStaticMemberValue(value.object, value, value.__qin_field_object)
  }
  if (fieldName === 'property') {
    return readStaticMemberValue(value.property, value, value.__qin_field_property)
  }
  if (fieldName === 'key') {
    return readStaticMemberValue(value.key, value, value.__qin_field_key)
  }
  if (fieldName === 'expression') {
    return readStaticMemberValue(value.expression, value, value.__qin_field_expression)
  }
  if (fieldName === 'element') {
    return readStaticMemberValue(value.element, value, value.__qin_field_element)
  }
  if (fieldName === 'argument') {
    return readStaticMemberValue(value.argument, value, value.__qin_field_argument)
  }
  if (fieldName === 'callee') {
    return readStaticMemberValue(value.callee, value, value.__qin_field_callee)
  }
  if (fieldName === 'left') {
    return readStaticMemberValue(value.left, value, value.__qin_field_left)
  }
  if (fieldName === 'right') {
    return readStaticMemberValue(value.right, value, value.__qin_field_right)
  }
  if (fieldName === 'test') {
    return readStaticMemberValue(value.test, value, value.__qin_field_test)
  }
  if (fieldName === 'consequent') {
    return readStaticMemberValue(value.consequent, value, value.__qin_field_consequent)
  }
  if (fieldName === 'alternate') {
    return readStaticMemberValue(value.alternate, value, value.__qin_field_alternate)
  }
  if (fieldName === 'init') {
    return readStaticMemberValue(value.init, value, value.__qin_field_init)
  }
  if (fieldName === 'id') {
    return readStaticMemberValue(value.id, value, value.__qin_field_id)
  }
  if (fieldName === 'declaration') {
    return readStaticMemberValue(value.declaration, value, value.__qin_field_declaration)
  }
  if (fieldName === 'discriminant') {
    return readStaticMemberValue(value.discriminant, value, value.__qin_field_discriminant)
  }
  return undefined
}

function pascalCaseEnumName(name: string): string {
  const parts = name.split('_').filter(Boolean)
  return parts.map(part => {
    if (part === 'TS') return 'TS'
    const lower = part.toLowerCase()
    return lower.slice(0, 1).toUpperCase() + lower.slice(1)
  }).join('')
}

function normalizeGeneratedAstType(value: any): string | undefined {
  if (typeof value === 'string') {
    return /^[A-Z][A-Z0-9_]*$/.test(value) ? pascalCaseEnumName(value) : value
  }
  const enumName = typeof value?.name === 'function' ? value.name() : value?.__qinEnumName
  if (typeof enumName === 'string' && enumName.length > 0) return pascalCaseEnumName(enumName)
  return undefined
}

function normalizeGeneratedAstList(value: any): any[] {
  return javaListToArray(value).map(item => normalizeGeneratedAst(item))
}

function normalizeGeneratedWrappedAstList(value: any, wrapperName: string): any[] {
  return javaListToArray(value).map(item => {
    const normalized = normalizeGeneratedAst(item)
    if (normalized == null || typeof normalized !== 'object') {
      return normalized
    }
    if (wrapperName in normalized) {
      normalized[wrapperName] = normalizeGeneratedAst(normalized[wrapperName])
      return normalized
    }
    return { [wrapperName]: normalized }
  })
}

function isGeneratedAstListField(nodeType: string, publicName: string): boolean {
  if (publicName === 'body') {
    return nodeType === 'Program'
      || nodeType === 'ClassBody'
      || nodeType === 'BlockStatement'
      || nodeType === 'StaticBlock'
      || nodeType === 'SwitchCase'
  }
  return publicName === 'params'
    || publicName === 'specifiers'
    || publicName === 'declarations'
    || publicName === 'arguments'
    || publicName === 'elements'
    || publicName === 'properties'
    || publicName === 'expressions'
    || publicName === 'decorators'
    || publicName === 'typeParameters'
    || publicName === 'implementsTypes'
}

const generatedAstArrayFields = [
  'body',
  'params',
  'specifiers',
  'declarations',
  'arguments',
  'elements',
  'properties',
  'expressions',
  'decorators',
  'typeParameters',
  'implementsTypes'
]

const generatedAstNodeFields = [
  'source',
  'imported',
  'local',
  'object',
  'property',
  'key',
  'value',
  'expression',
  'element',
  'argument',
  'callee',
  'left',
  'right',
  'test',
  'consequent',
  'alternate',
  'init',
  'id',
  'declaration',
  'discriminant',
  'body'
]

function normalizeGeneratedAstChildren(node: any) {
  const nodeType = normalizeGeneratedAstType(readGeneratedField(node, 'type')) ?? recordClassSimpleName(node)
  for (const field of generatedAstArrayFields) {
    const value = readGeneratedField(node, field)
    if (value !== undefined && nodeType && isGeneratedAstListField(nodeType, field)) {
      defineAstProperty(
        node,
        field,
        javaListToArray(value).map((item: any) => normalizeGeneratedAst(item)).filter((item: any) => field !== 'body' || (item && item.type))
      )
    }
  }
  for (const field of generatedAstNodeFields) {
    const value = readGeneratedField(node, field)
    if (value) defineAstProperty(node, field, normalizeGeneratedAst(value))
  }
}

function defineAstProperty(target: any, name: string, value: any) {
  if (value === undefined) return
  Object.defineProperty(target, name, {
    value,
    configurable: true,
    enumerable: true,
    writable: true
  })
}

function generatedFieldPublicName(key: string): string | undefined {
  if (key.startsWith('__qin_field___qin_')) return key.slice('__qin_field___qin_'.length)
  if (key.startsWith('__qin_field_')) return key.slice('__qin_field_'.length)
  if (key.startsWith('___qin_')) return key.slice('___qin_'.length)
  if (key.startsWith('__')) return key.slice(2)
  return undefined
}

export function normalizeGeneratedAst<T = any>(ast: T): T {
  if (!ast || typeof ast !== 'object') return ast
  const node: any = ast
  if (node.__csstsLegacyAst === true) {
    normalizeGeneratedAstChildren(node)
    return ast
  }

  const type = normalizeGeneratedAstType(readGeneratedField(node, 'type')) ?? recordClassSimpleName(node)
  if (!type) {
    if (Array.isArray(node)) {
      for (let i = 0; i < node.length; i++) node[i] = normalizeGeneratedAst(node[i])
      return ast
    }
    for (const key of Object.keys(node)) {
      const publicName = generatedFieldPublicName(key)
      if (!publicName) continue
      const value = readGeneratedField(node, publicName)
      defineAstProperty(node, key, Array.isArray(value)
        ? value.map(item => normalizeGeneratedAst(item))
        : normalizeGeneratedAst(value))
    }
    return ast
  }
  Object.defineProperty(node, '__csstsLegacyAst', { value: true, configurable: true })
  defineAstProperty(node, 'type', type)

  const value = readGeneratedField(node, 'value')
  defineAstProperty(node, 'value', value)

  const loc = normalizeGeneratedLocation(readGeneratedField(node, 'location'))
  defineAstProperty(node, 'loc', node.loc ?? loc)

  for (const key of Object.keys(node)) {
    if (key === '__qinJavaRecordClass' || key === '__csstsLegacyAst') continue
    const publicName = generatedFieldPublicName(key)
    if (!publicName) continue
    const value = readGeneratedField(node, publicName)
    if (publicName === 'location') continue
    if (type === 'ArrayExpression' && publicName === 'elements') {
      defineAstProperty(node, publicName, normalizeGeneratedWrappedAstList(value, 'element'))
    } else if (type === 'ObjectExpression' && publicName === 'properties') {
      defineAstProperty(node, publicName, normalizeGeneratedWrappedAstList(value, 'property'))
    } else if (isGeneratedAstListField(type, publicName)) {
      defineAstProperty(node, publicName, normalizeGeneratedAstList(value))
    } else {
      defineAstProperty(node, publicName, normalizeGeneratedAst(value))
    }
  }

  if (type === 'Property' || type === 'MethodDefinition') {
    const propertyValue = readGeneratedField(node, 'value')
    if (propertyValue !== undefined) defineAstProperty(node, 'value', normalizeGeneratedAst(propertyValue))
  }

  normalizeGeneratedAstChildren(node)

  return ast
}
