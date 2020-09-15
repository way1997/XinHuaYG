export const backPage = {
	methods :{
		back(){
      if (window.history.length <= 1) {
        this.$router.push({path:'/'})
        return false
    } else {
        this.$router.go(-1)
    }
		}
	}
}
