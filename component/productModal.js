 export default {
    props:['tempProduct','updateProduct','isNew','imagesUrl','createImages'],
    data(){
        return{
            myModal:null,
        }
    },
    methods:{
        openModal(){
            this.myModal.show()
        },
        closeModal(){
            this.myModal.hide()
        }
    },
    template:`
    {{tempProduct}}
    <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
           aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 id="productModalLabel" class="modal-title" >
                <span v-if="isNew">新增產品</span>
                <span v-else>編輯產品</span>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="mb-2">

                    <div class="mb-3">
                      <label for="imagesUrl" class="form-label">主要圖片</label>
                      <input type="text" id="imageUrl" class="form-control" v-model="tempProduct.imageUrl" placeholder="請輸入圖片連結">
                      <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
                    </div>

                    <h5 class="mb-3">多圖新增</h5>
                    <template v-if="Array.isArray(tempProduct.imagesUrl)" class="mb-5">
                        <div v-for="(item,key) in tempProduct.imagesUrl" :key="key">
                          <div class="mb-3">
                            <label :for="imagesUrl" class="form-label mb-0">圖片網址</label>
                            <input :id='imagesUrl' type="text" class="form-control mb-1" v-model="tempProduct.imagesUrl[key]" placeholder="請輸入圖片連結">
                          </div>
                          <img class="img-fluid" :src="item" alt="">
                        </div>
                        <template v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]" class="my-2">
                          <button class="btn btn-outline-primary btn-sm d-block w-100" @click="tempProduct.imagesUrl.push('')">
                            新增圖片
                          </button>
                        </template>
                        <div v-else>
                          <button class="btn btn-outline-danger btn-sm d-block w-100"  @click="tempProduct.imagesUrl.pop()">
                            <!-- 移除 tempProduct.imagesUrl pop一個元素 -->
                            刪除圖片
                          </button>
                        </div>
                    </template>
                    <div v-else>
                      <button class="btn btn-outline-primary btn-sm d-block w-100"  @click="createImages">
                        新增圖片
                      </button>
                    </div>  
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="mb-3">
                    <label for="title" class="form-label">標題</label>
                    <input id="title" type="text" class="form-control" placeholder="請輸入標題"  v-model="tempProduct.title">
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="category" class="form-label">分類</label>
                      <input id="category" type="text" class="form-control"
                             placeholder="請輸入分類" v-model="tempProduct.category">
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">單位</label>
                      <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tempProduct.unit">
                    </div>
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="origin_price" class="form-label">原價</label>
                      <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model="tempProduct.origin_price">
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">售價</label>
                      <input id="price" type="number" min="0" class="form-control"
                             placeholder="請輸入售價" v-model="tempProduct.price">
                    </div>
                  </div>
                  <hr>

                  <div class="mb-3">
                    <label for="description" class="form-label">產品描述</label>
                    <textarea id="description" type="text" class="form-control"
                              placeholder="請輸入產品描述" v-model="tempProduct.description">
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <label for="content" class="form-label">說明內容</label>
                    <textarea id="description" type="text" class="form-control"
                    placeholder="請輸入說明內容"  v-model="tempProduct.content">
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <div class="form-check">
                      <input id="is_enabled" class="form-check-input" type="checkbox"
                      v-model="tempProduct.is_enabled" :true-value="1" :false-value="0" >
                      <label class="form-check-label" for="is_enabled">是否啟用</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" >
                取消
              </button>
              <button type="button" class="btn btn-primary" @click="updateProduct">
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    `,
    mounted(){
        this.myModal=new bootstrap.Modal(document.querySelector('#productModal'));
    }
 }