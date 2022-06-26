#!/bin/bash
cd /home/ec2-user/news-archive
npm i
cp /home/ec2-user/.env /home/ec2-user/news-archive/.env
npx prisma migrate deploy
exit 0
