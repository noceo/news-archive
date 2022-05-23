#!/bin/bash
cd /home/ec2-user
pm2 start ecosystem.config.js
systemctl restart nginx
exit 0
