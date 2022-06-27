#!/bin/bash
cd /home/ec2-user
pm2 start ecosystem.config.js
pm2 save
sudo systemctl restart nginx
exit 0
