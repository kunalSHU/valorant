#!/bin/bash

printf "*************************\n"
printf "**** BEGINNING SETUP ****\n"
printf "*************************\n\n"

printf "*********************************************\n"
printf "**** Copying up Git Hooks to ./git/hooks ****\n"
printf "*********************************************\n\n"
cp -v ./git-hooks/* .git/hooks

printf "\n************************\n"
printf "**** FINISHED SETUP ****\n"
printf "************************\n"