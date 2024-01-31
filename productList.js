import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

// let myModal = '';
// let delProductModal='';
const apiUrl= `https://vue3-course-api.hexschool.io/v2`
const path= 'maciw2'

import pagination from './component/pagination.js';
import productModal from './component/productModal.js';

const app = createApp({
    data(){
        return{
            apiUrl,
            path,
            products:[], // 資料集
            isNew: false, //是否是新的
            tempProduct:{
                imagesUrl: [],
            },//暫存區
            myModal : null, //profuceModal
            modalDel:null,
            pages: {}
        };
    },
    methods: {
       checkAdmin(){
                axios.post(`${this.apiUrl}/api/user/check`) 
                .then((res)=>{
                    this.getData();
                })
                .catch((err)=>{
                    alert(err.response.data.message);
                    //window.location = 'login.html';
                })
       },
       getData(page=1){
            axios.get(`${this.apiUrl}/api/${this.path}/admin/products?page=${page}`) 
                .then((res)=>{
                    this.products=res.data.products;//有分頁
                    this.pages = res.data.pagination;
                    console.log(res)
                })
                .catch((err)=>{
                    alert(err.response.data.message);
                })
       },
       showProduct(item){
        this.tempProduct=item;
       },
       openModal(isNew, item){
        if(isNew === 'new'){
            this.tempProduct={
                imagesUrl:[],
                //新增，將所有欄位淨空
            };
            this.isNew=true;
            this.$refs.pModal.openModal();
            //myModal.show();
        }else if(isNew === 'edit') {
            this.tempProduct={...item};//將值帶入input
            this.isNew=false;
            //myModal.show();
            this.$refs.pModal.openModal();
        }else if(isNew === 'delete'){
            //this.tempProduct={...item};
            //delProductModal.show();//跳出警告視窗
        }

        //myModal.show();
       },
       updateProduct(){ //更新與新增使用同一個 method
            let url = `${this.apiUrl}/api/${this.path}/admin/product`
            let http = 'post' //傳入資料 

            if(!this.isNew){//當確認為新增時，更新資料。這個是編輯的不是新增
                url = `${this.apiUrl}/api/${this.path}/admin/product/${this.tempProduct.id}`
                http = 'put' //更新資料
            }

            axios[http](url,{data:this.tempProduct})
                .then((res)=>{
                    alert(res.data.message);
                    this.$refs.pModal.closeModal();
                    this.getData();
                })
                .catch((err)=>{
                    alert(err.data.message);
                })
       },
       createImages(){
        //新增圖片。將陣列中資料清空，新增新資料
         this.tempProduct.imagesUrl=[];
         this.tempProduct.imagesUrl.push('');
       },
       removeImgurl(){
        const url = `${this.apiUrl}/api/${this.path}/admin/product/${this.tempProduct.id}`;
        axios.delete (url,{data:this.tempProduct})
                .then((res)=>{
                    alert(res.data.message);
                    delProductModal.hide();
                    this.getData();
                })
                .catch((err)=>{
                    alert(err.data.message);
                })
       }
    },
    mounted(){
        //token
        // const token = document.cookie.split('; ').find((row) => row.startsWith('hexVueToken='))
        // ?.split('=')[1];
        // axios.defaults.headers.common['Authorization'] = token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexVueToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
    
        this.checkAdmin();
        
        this.delProductModal=new bootstrap.Modal(document.querySelector('#delProductModal'));
    },
    components:{
        pagination,
        productModal
    }
});

app.mount('#app')


