FROM php:7.4-apache
RUN pecl install xdebug-2.8.1  \
    && docker-php-ext-install pdo pdo_mysql mysqli \
    && docker-php-ext-enable xdebug pdo pdo_mysql mysqli
