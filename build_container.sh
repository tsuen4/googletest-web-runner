#!/bin/sh

cd `dirname $0`
docker build -t gtest_runner ./docker/ --no-cache

