// seed.ts
// import { PrismaClient } from '@prisma/client';

const { PrismaClient } = require('@prisma/client'); 

const prisma = new PrismaClient();
// const prisma = require("../lib/prisma");
  let lastId: number
  const userIds: any = [];
  const groupData: any = [];

async function main() {
  // Clear existing data
  try {
    await prisma.user.deleteMany({});
  
  // await prisma.post.deleteMany({});

  // Seed data
  type UserTuple = [string, string, string];

  const users: UserTuple[] = [["ctrewett0","lbroggio0@arstechnica.com",'2024-07-28T02:27:18.973Z'],
  ["omacnockater1","fparradine1@google.ru",'2024-07-28T02:27:18.973Z'],
  ["bdellenty2","ndulake2@cyberchimps.com",'2024-07-28T02:27:18.973Z'],
  ["kjudge3","lpenhearow3@wunderground.com",'2024-07-28T02:27:18.973Z'],
  ["hballs4","mdressel4@devhub.com",'2024-07-28T02:27:18.973Z'],
  ["mkirkbright5","mhiggoe5@creativecommons.org",'2024-07-28T02:27:18.973Z'],
  ["sseawright6","dderobertis6@indiegogo.com",'2024-07-28T02:27:18.973Z'],
  ["bsharrock7","ttruelock7@clickbank.net",'2024-07-28T02:27:18.973Z'],
  ["lvella8","lfuxman8@t.co",'2024-07-28T02:27:18.973Z'],
  ["rpendlenton9","asatterly9@jimdo.com",'2024-07-28T02:27:18.973Z'],
  ["rbaudassia","knettleshipa@wikimedia.org",'2024-07-28T02:27:18.973Z'],
  ["rvainb","ekernarb@ehow.com",'2024-07-28T02:27:18.973Z'],
  ["vweltonc","mewersc@moonfruit.com",'2024-07-28T02:27:18.973Z'],
  ["caxupd","tliveingd@drupal.org",'2024-07-28T02:27:18.973Z'],
  ["bbensone","irevellee@google.cn",'2024-07-28T02:27:18.973Z'],
  ["ffoulghamf","broddyf@scribd.com",'2024-07-28T02:27:18.973Z'],
  ["celceg","mwhittetg@imageshack.us",'2024-07-28T02:27:18.973Z'],
  ["nclackh","enordassh@japanpost.jp",'2024-07-28T02:27:18.973Z'],
  ["acurweni","csterrei@pcworld.com",'2024-07-28T02:27:18.973Z'],
  ["cbrunottij","mgleedj@psu.edu",'2024-07-28T02:27:18.973Z'],
  ["kevin","zhu.kevin12@gmail.com",'2024-07-28T02:27:18.973Z']]
  
  
  for (let i = 0; i < users.length; i++) {
    const [username, email, date] = users[i];
    try {
      const createdUser = await prisma.user.create({
        data: {
          email: email,
          username: username,
          emailVerified: date
        }
      });
      console.log('User created:', createdUser);
      if (i === users.length-1) {
        lastId = createdUser.id
      } else userIds.push(createdUser.id)
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }
} catch (error) {
    console.error('Error in user main function:', error);
  } finally {
    await prisma.$disconnect();
  }
try {
  type GroupTuple = [string, number];
  
  const groups: GroupTuple[] = [["9CB5B80D",lastId],["9CB5B80Z",lastId],["9CB5B80X",lastId],["9CB5B80C",lastId],["9CB5B80V",lastId]]
    for (let group of groups) {
      const [code, id] = group;

      try {
        const createdGroup = await prisma.group.create({
          data: {
            secretCode: code,
            adminId: id
          }
        });
        groupData.push([createdGroup.id,code])
        console.log('Group created:', createdGroup);
      } catch (error) {
        console.error('Error creating group:', error);
      }
  }} catch (error) {
    console.error('Error in group main function:', error);
} finally {
    await prisma.$disconnect();
}

  try {
    console.log("userids", userIds)
    for (let i=0; i < userIds.length; i++) {
      console.log("✅✅✅ ", userIds[i], groupData[i%groupData.length])
      const [id, code] = groupData[i]
      const createdGroupUsers = await prisma.groupuser.create({
        data: {
          userId: userIds[i],
          groupId: groupData[(i/groupData.length)%groupData.length][0],
          // secretCode: code,
          // adminId: lastId 
        }
      })
      console.log('Group User created:', createdGroupUsers);
    }
  } catch (error) {
    console.error('Error in Group User main function', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


