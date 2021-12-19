import Pusher from 'pusher-js'
export const pusher = new Pusher('your_pusher_app_key', {
    cluster: 'eu'
  });