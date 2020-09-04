<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    props :{
      probeType:{
        type: Number,
        default : 1
      },
      click:{ //是否可以点击 添加滑动默认禁止点击事件
        type: Boolean,
        default: true
      },
      data: { //滑动列表数据
        type:Array,
        default: null
      },
      listenScroll: {//是否监听滑动
        type:Boolean,
        default: false
      },
      pullup: { //是否需要下拉
        type: Boolean ,
        default :false
      },
      pulldown: { //是否需要上拉
        type: Boolean,
        defalut: false
      },
      beforeScroll: { //监听滚动开始前
        type:Boolean,
        defalut :false
      },
      refreshDelay: { //scroll加载延迟时间
        type: Number,
        default :20
      }
    },
    mounted(){
      setTimeout(()=>{
        this._initScroll();
      } ,20)
    },
    methods: {
      _initScroll(){
        if(!this.$refs.wrapper){
          return 
        }
        //实例化滚动
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType :this.probeType,
          click :this.click
        })

        if(this.listenScroll){
          let me = this 
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll',pos)//监听滚动时间  emit 滚动位置
          })
        }

        if(this.pullup){
          this.scroll.on('scrollEnd',()=>{
            if(this.scroll.y <= (this.scroll.maxScrollY + 50)){
              this.$emit('scrollToEnd')
            }
          })
        }

        if(this.pulldown){
          this.scroll.on('scroll',()=>{
            if(this.scroll.y >=  50){
              this.$emit('scrollRefresh') 
            }
          })
          this.scroll.on('scrollEnd',()=>{
            this.$emit('touchEnd')
          })
        }

        if(this.beforeScroll){
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      //scroll 刷新方法 可以在父组件引用
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      //滚动到某个位置
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      //滚动到某个元素
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      //监听数据变化 重新刷新scroll
      data() {
        setTimeout(()=>{
          this.refresh()
        } ,this.refreshDelay)
      }
    }
  }
</script>

<style scoped lang="less">

</style>