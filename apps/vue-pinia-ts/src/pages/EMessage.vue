<template>
    <div>
        <h1>Message</h1>
        <el-button @click="handleSend">fetch</el-button>
    </div>
</template>

<script lang="ts" setup>
import useShowMessage from '@/hooks/useShowMessage';
const { showMessage } = useShowMessage()

const handleSend = () => {
    
    fetch("/a").then(res => res.json()).then(res => { }).catch(error => {
        showMessage({
            message: error.message,
            type: 'error',
            showClose: true
        })
    })
}
</script>

<style scoped></style>