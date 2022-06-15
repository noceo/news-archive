#!/bin/bash
cd /home/ec2-user
sudo pm2 start ecosystem.config.js
sudo systemctl restart nginx
exit 0
