#!/bin/bash
cd /home/ec2-user
sudo pm2 start ecosystem.config.js
sudo pm2 save
sudo systemctl restart nginx
exit 0
