<template>
<div class="login">
  <div id="mainButton">
    <div class="open btn-text">Login In</div>
    <div class="modal">
      <div class="close close-btn">x</div>
      <div class="form-title">Login In</div>
      <div class="input-group">
        <input type="text" id="name" v-model="form.username" @blur="checkInput($event)">
        <label for="name">Username</label>
      </div>
      <div class="input-group">
        <input type="text" id="password" v-model="form.password" @blur="checkInput($event)">
        <label for="password">Password</label>
      </div>
      <div class="form-button" @click="submit">Go</div>
      <div class="author">zzAutumn.cn @2019</div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  form: object = {
    username: '',
    password: '',
  }

  submit() {
    console.log(this.form);
  }

  checkInput(e: any) {
    const { target } = e;
    target.value.length > 0 ? target.classList.add('active')
      : target.classList.remove('active');
  }

  closeModal() {
    const wrap = document.querySelector('#mainButton');
    if (wrap) {
      wrap.classList.remove('active');
    }
  }

  mounted() {
    const openBtn = document.querySelector('.open');
    const closeBtn = document.querySelector('.close');
    const wrap = document.querySelector('#mainButton');
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        if (wrap) {
          wrap.classList.add('active');
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (wrap) {
          wrap.classList.remove('active');
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@shadow1: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
@shadow2 : 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
@shadow3 : 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
@shadow4 : 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
@shadow5 : 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);

*,*:before,*:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.login {
  color: #999;
  padding: 20px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fbfbfb;
}
#mainButton {
  color: #fff;
  border: none;
  outline: none;
  font-size: 24px;
  font-weight: 200;
  overflow: hidden;
  position: relative;
  border-radius: 2px;
  letter-spacing: 2px;
  box-shadow: @shadow1;
  text-transform: uppercase;
  background-color: #00a7ee;
  transition: all 0.2s ease-in;
  &:after {
    position: absolute;
    top: -50%;
    content: '';
    width: 150%;
    height: 200%;
    left: calc(-150% - 40px);
    background-color: rgba(255,255,255, .2);
    transform: skewX(-40deg);
    transition: all 0.2s ease-out;
  }
  &:hover {
    cursor: default;
    box-shadow: @shadow3;
    &:after {
      transform: translateX(100%) skewX(-30deg);
    }
  }
  .btn-text {
    z-index: 2;
    display: block;
    padding: 10px 20px;
    position: relative;
    &:hover {
      cursor: pointer;
    }
  }
  &.active {
    box-shadow: @shadow5;
    .modal {
      transform: scale(1,1);
    }
  }
  .modal {
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: inherit;
    transform-origin: center center;
    background-image: linear-gradient(to top left, #00a7ee 10%,
    lighten(#00a7ee, 20%) 65%, white 200%);
    transform: scale(0.000001,0.00001);
    transition: all 0.2s ease-in;
    .close-btn {
      top: 20px;
      right: 20px;
      position: absolute;
      transition: opacity 0.2s ease-in;
      &:hover {
        opacity: 0.5;
        cursor: pointer;
      }
    }

    .form-title {
      margin-bottom: 15px;
    }

    .form-button {
      width: 100%;
      padding: 10px;
      color: #00a7ee;
      margin-top: 10px;
      max-width: 400px;
      text-align: center;
      border: solid 1px white;
      background-color: white;
      transition: color 0.2s ease-in, background-color 0.2s ease-in;
      &:hover {
        color: white;
        cursor: pointer;
        background-color: transparent;
      }
    }

    .input-group {
      width: 100%;
      font-size: 16px;
      max-width: 400px;
      padding-top: 20px;
      position: relative;
      margin-bottom: 15px;
      input {
        width: 100%;
        color: white;
        border: none;
        outline: none;
        padding: 5px 0;
        line-height: 1;
        font-size: 16px;
        font-family: 'Raleway';
        border-bottom: solid 1px white;
        background-color: transparent;
        transition: box-shadow 0.2s ease-in;
        + label {
          left: 0;
          top: 20px;
          position: absolute;
          pointer-events: none;
          transition: all 0.2s ease-in;
        }
        &:focus {
          box-shadow: 0 1px 0 0 white;
        }
        &:focus,
        &.active {
          + label {
            font-size: 12px;
            transform: translateY(-20px);
          }
        }
      }
    }
  }

  .author {
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 10px;
    font-size: 16px;
    position: absolute;
    text-align: center;
    text-transform: none;
    letter-spacing: initial;
  }
}
</style>
