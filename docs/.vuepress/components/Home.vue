<template>
    <div class="theme-container">
        dsfksjdfsdf
        <Content ref="c"/>
        <router-link to="article.html">1111</router-link>
    </div>
</template>
<script>
export default {
    mounted() {
        console.log(this.$router);
        console.log(this.$page);
        console.log(this.$site);
        console.log('refs', this.$refs.c);
    }
}
</script>