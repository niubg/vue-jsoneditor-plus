<template>
    <div>
        {{data}}
    </div>
</template>

<script>
import {setAlert} from "./conmon.js"
export default {
    data() {
        return {
            data: "开始啦"
        }
    },
    mounted() {
        this.getinfo()
    },
    methods: {
        getinfo() {
            setAlert()
        }
    }
}
</script>