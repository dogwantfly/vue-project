import emitter from '@/methods/emitter';

export default function (response, title = '更新') {
  if (response.data) {
    if (response.data.success) {
      emitter.emit('push-message', {
        style: 'success',
        title: `${title}成功`,
        content: response.data.message,
      });
    } else {
      const message = typeof response.data.message === 'string'
        ? [response.data.message] : response.data.message;
      emitter.emit('push-message', {
        style: 'danger',
        title: `${title}失敗`,
        content: message.join('、'),
      });
    }
  } else {
    emitter.emit('push-message', {
      style: 'danger',
      title: '連線錯誤',
      content: `${response.message}，請嘗試重新整理` || `${response}，請嘗試重新整理`,
    });
  }
}
