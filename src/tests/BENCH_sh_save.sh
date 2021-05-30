#!/bin/bash

#save 10 times
NUMBERLOOP=10

if [ $# -eq 1 ]
then
  NUMBERLOOP=$1
fi
  
echo "Number of Repeats : $NUMBERLOOP"  
echo ""

for ((i = 1 ; i <= NUMBERLOOP ; i++)); do
  bash -c "./src/tests/test_save.sh Yesss"  ;  
done