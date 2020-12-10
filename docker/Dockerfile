FROM alpine:3

WORKDIR /tmp/
COPY docker-entrypoint.sh /tmp/
RUN apk add make cmake gcc g++

RUN wget 'https://github.com/google/googletest/archive/release-1.10.0.tar.gz'
RUN tar -zxvf release-1.10.0.tar.gz
RUN mkdir -p /usr/local/src/
RUN mv googletest-release-1.10.0/ /usr/local/src/

WORKDIR /usr/local/src/googletest-release-1.10.0/build/
RUN cmake ..
RUN make
RUN make install

VOLUME /gtest
WORKDIR /gtest

ENTRYPOINT ["/tmp/docker-entrypoint.sh"]

