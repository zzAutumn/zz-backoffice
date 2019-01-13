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
    <div class="foot-row">
      <el-button plain>提交</el-button>
    </div>
  </div>
</template>
<script lang='ts'>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { Component, Vue } from 'vue-property-decorator';
import { quillEditor } from 'vue-quill-editor';

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
  form = {
    title: '',
    content: '',
    tags: ['js'],
  }
  editorOption: object = {}
  inputVisible: boolean = false

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
    border: solid 1px #ddd;
    display: flex;
    padding: 10px 10px;
    align-items: center;
    .tag-label {
      display: inline-block;
      position: relative;
      margin-right: 10px;
    }
    .tags {
      .el-tag + .el-tag {
        margin-left: 10px;
        margin-bottom: 5px;
      }
      .button-new-tag {
        margin-left: 10px;
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
