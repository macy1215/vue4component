import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

let myModal = '';
let delProductModal='';


const app = createApp({
    data(){
        return{
            apiUrl: `https://vue3-course-api.hexschool.io/v2`,
            path:'maciw2',
            products:[], // 資料集
            isNew: false, //是否新增
            tempProduct:{
                imagesUrl: [],
            },//暫存區
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
       getData(){
            axios.get(`${this.apiUrl}/api/${this.path}/admin/products`) 
                .then((res)=>{
                    this.products=res.data.products;
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
            myModal.show();
        }else if(isNew === 'edit') {
            this.tempProduct={...item};//將值帶入input
            this.isNew=false;
            myModal.show();
        }else if(isNew === 'delete'){
            //this.tempProduct={...item};
            delProductModal.show();//跳出警告視窗
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
                    myModal.hide();
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
        myModal=new bootstrap.Modal(document.querySelector('#productModal'));
        delProductModal=new bootstrap.Modal(document.querySelector('#delProductModal'));
    }
});

app.mount('#app')


