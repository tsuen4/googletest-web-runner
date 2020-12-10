#!/bin/sh

if [ $# -lt 1 ]; then
    g++ --help
    exit
fi

# echo "$@"

g++ $@ -pthread -lgtest -lgtest_main && ./a.out
