import service from './service';

declare module 'vue/types/vue' {
  interface Vue {
    $service: object;
  }
}
