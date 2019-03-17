<template>
  <div class="page">
    <div class="row">
      <span class="form-title">文章标题: </span>
      <input class="title" type="text" v-model="form.title">
    </div>
    <quill-editor
      ref="myQuillEditor"
      v-model="form.content"
      :options='editorOption'
    ></quill-editor>
    <div class="intro one-row">
      <span class="row-label">简介: </span>
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入文章简介"
        v-model="form.intro">
      </el-input>
    </div>
    <div class="tag-bar">
      <span class="tag-label">标签: </span>
      <div class="tags">
        <el-tag
          :key="tag"
          v-for="tag in form.tags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="tag"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag"
        size="small" @click="showInput">+ New Tag</el-button>
      </div>
    </div>
    <el-upload
      class="upload-control"
      action="/zzautumn/v1/upload/img"
      :file-list="imgList"
      :on-success="imgSuccess"
      :on-error="imgError"
      :limit="1"
      accept=".jpeg,.jpg,.png"
      list-type="picture">
      <el-button size="small" type="primary">点击上传文章大图</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpeg/jpg/png文件</div>
    </el-upload>
    <div class="foot-row">
      <el-button plain @click="submit">提交</el-button>
    </div>
  </div>
</template>
<script lang='ts'>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { Component, Vue } from 'vue-property-decorator';
import { quillEditor, Quill } from 'vue-quill-editor';
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module';

Quill.register('modules/ImageExtend', ImageExtend);

interface LoginForm {
  id: number|null;
  title: string;
  content: string;
  tags: string[];
  imgBanner: string;
  intro: string;
}

@Component({
  components: {
    quillEditor,
  },
})

export default class ArticleEdit extends Vue {
  $refs!: {
    saveTagInput: any;
  }
  tag: string = ''
  form: LoginForm = {
    id: null,
    title: '',
    content: '',
    tags: [],
    imgBanner: '',
    intro: '',
  }
  // 富文本框参数设置
  editorOption: object = {
    modules: {
      ImageExtend: {
        loading: true,
        name: 'file',
        action: '/zzautumn/v1/upload/img',
        response: (res: any) => res.data,
      },
      toolbar: {
        container,
        handlers: {
          image: function () {
            QuillWatch.emit(this.quill.id);
          },
        },
      },
    },
  }
  inputVisible: boolean = false
  imgList: object = []

  async getData(articleId: number) {
    const result = await this.$service.article.getArticleById({ id: articleId });
    if (result.code === '200') {
      const {
        title, content, assignTags, id,
      } = result.data;
      Object.assign(this.form, { title, content, id });
      const tags = assignTags.split(',');
      this.form.tags = tags;
    }
  }

  handleInputConfirm() {
    const inputVal = this.tag;
    inputVal && this.form.tags.push(inputVal);
    this.inputVisible = false;
    this.tag = '';
  }
  showInput() {
    this.inputVisible = true;
    this.$nextTick(() => {
      this.$refs.saveTagInput.$refs.input.focus();
    });
  }
  handleClose(tag: string) {
    this.form.tags.splice(this.form.tags.indexOf(tag), 1);
  }
  // 上传图片成功
  imgSuccess(response: any, file: any) {
    if (response.result) {
      this.form.imgBanner = response.data;
    }
  }
  // 上传图片失败
  imgError(err: any, file: any) {
    this.$message.error(JSON.stringify(err));
  }
  async submit() {
    console.log(this.form);
    if (!this.validateForm(this.form)) {
      return;
    }
    const result = await this.$service.article.saveArticle(this.form);
    if (result.code === '200') {
      this.$message({
        message: '文章保存成功',
        type: 'success',
      });
      this.$router.push('/listArticle');
    } else {
      this.$message.error('文章保存失败');
    }
  }

  validateForm(form: LoginForm) {
    if (form.title === '') {
      this.$message.error('请填写标题');
      return false;
    }
    if (form.content === '') {
      this.$message.error('请填写文章内容');
      return false;
    }
    if (form.imgBanner === '') {
      this.$message.error('请上传文章大图');
      return false;
    }
    if (form.intro === '') {
      this.$message.error('请填写文章简介');
      return false;
    }
    return true;
  }

  created() {
    if (localStorage.articleId) {
      this.getData(localStorage.articleId);
    }
  }

  destroyed() {
    localStorage.articleId && localStorage.removeItem('articleId');
  }
}
</script>
<style lang='less' scoped>
.page {
  padding: 20px 30px;
  .row {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    .form-title {
      width: 80px;
    }
    input[class="title"] {
      min-width: 600px;
      border: none;
      border-bottom: 1px solid #ddd;
      outline: #614ce5;
      font-size: 18px;
    }
  }
  .quill-editor {
    /deep/ .ql-container {
      min-height: 600px;
    }
  }
  .tag-bar {
    margin-top: 20px;
    min-height: 50px;
    display: flex;
    padding: 10px 10px;
    align-items: center;
    .tag-label {
      margin-right: 10px;
      min-width: 60px;
    }
    .tags {
      .el-tag + .el-tag {
        margin-left: 10px;
        margin-bottom: 5px;
      }
      .button-new-tag {
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
      .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
      }
    }
  }
  .one-row {
    margin-top: 20px;
    display: flex;
    padding: 10px 10px;
    align-items: center;
    .row-label {
      margin-right: 10px;
      min-width: 60px;
    }
  }
  .upload-control {
    margin: 20px 0;
  }
  .foot-row {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    .el-button.el-button--default {
      background: #614ce5;
      color: #fff;
      &:hover,&:active,&:focus {
        border-color: #614ce5;
      }
    }
  }
}
</style>
