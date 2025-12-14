<template>
  <button 
    class="local-button" 
    :class="[`local-button--${type}`, { 'is-plain': plain, 'is-round': round }]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="loading-icon">⏳</span>
    <span>[LOCAL-999-UPDATED] <slot /></span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'
  plain?: boolean
  round?: boolean
  disabled?: boolean
  loading?: boolean
}>()

defineEmits(['click'])
</script>

<style scoped>
.local-button {
  padding: 10px 20px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.local-button:hover {
  border-color: #409eff;
  color: #409eff;
}

.local-button--primary {
  background: #409eff;
  border-color: #409eff;
  color: #fff;
}

.local-button--success {
  background: #67c23a;
  border-color: #67c23a;
  color: #fff;
}

.local-button--warning {
  background: #e6a23c;
  border-color: #e6a23c;
  color: #fff;
}

.local-button--danger {
  background: #f56c6c;
  border-color: #f56c6c;
  color: #fff;
}

.local-button--info {
  background: #909399;
  border-color: #909399;
  color: #fff;
}

.is-plain {
  background: transparent;
}

.is-plain.local-button--primary {
  color: #409eff;
}

.is-round {
  border-radius: 20px;
}

.local-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-icon {
  margin-right: 5px;
}
</style>
