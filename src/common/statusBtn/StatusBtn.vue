<template>
    <button :style="styleList[text]">
        {{text}}
    </button>
</template>

<script>
export default {
    name: "status-btn",
    props: {
        text: String
    },
    data(){
        return {
            styleList: {
                "购票": {'background-color': '#f03d37'},
                "预售": {'background-color': '#3C9FE6'},
                "想看": {'background-color': '#faaf00'},
            }
        }
    }
}
</script>

<style scoped>
button{
    color: #fff;
    outline: none;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
}
</style>
