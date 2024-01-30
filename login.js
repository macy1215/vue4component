import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data(){
    return{
      user:{
        username: "",
        password: "",
      }
    }
  },
  methods: {
    login(){
      const url = `https://vue3-course-api.hexschool.io/v2`;
      const path = 'maciw2';

      axios.post(`${url}/admin/signin`,this.user)
      .then((res)=>{
        const { token , expired} = res.data //解構 將token 跟時間抓到
        console.log(token,expired);
        document.cookie = `hexVueToken=${token}; expires=${expired}`;
        window.location= 'productlist.html'
      })
      .catch((err)=>{
        console.dir(err)
      })
    }
  },

}).mount('#app')

