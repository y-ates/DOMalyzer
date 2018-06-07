#!/bin/bash


http-server -c-1 >>http_server.log 2>&1 &

php -S localhost:8002 >>php_server.log 2>&1 &
