#!/bin/bash
cd /home/ec2-user/news-archive
sudo npm i
cd /home/ec2-user/news-archive/client
sudo npm i
sudo npm run build
exit 0
