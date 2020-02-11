#!/bin/sh
mongo "$(node -p "require('./config/dev').mongoURI")"
