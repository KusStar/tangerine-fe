from nginx
label maintainer "kusstar"
copy ./build/ /usr/share/nginx/html/
copy ./nginx.conf /etc/nginx/conf.d/default.conf
expose 83