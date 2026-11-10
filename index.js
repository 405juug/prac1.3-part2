const { sequelize } = require('./models');
const seed = require('./seed');
const tasks = require('./tasks');

(async () => {
    await sequelize.sync({ force: true });
    await seed();

    console.log('--- Задание 1 ---');
    const t1 = await tasks.getUsersWithRecentPosts();
    t1.forEach((u) =>
    console.log(u.name, u.posts.map((p) => `${p.title} (${p.publishedAt.toISOString().slice(0, 10)})`)));

    console.log('--- Задание 2 ---');
    const t2 = await tasks.getAllAuthorsIncludingEmpty();
    t2.forEach((a) => console.log(a.lastName, a.books.map((b) => b.title)));

    console.log('--- Задание 3 ---');
    const t3 = await tasks.getStudentsInAdvancedCourses();
    t3.forEach((s) => console.log(s.name, s.courses.map((c) => `${c.title} (${c.credits})`)));

    console.log('--- Задание 4 ---');
    const t4 = await tasks.getOrdersWithBulkItems();
    t4.forEach((o) =>
    console.log(o.number, o.items.map((i) => `${i.productName} x${i.quantity} @${i.price}`)));

    console.log('--- Задание 5 ---');
    const t5 = await tasks.getActiveUsersWithPublishedPosts();
    t5.forEach((u) => console.log(u.name, u.posts.map((p) => p.title)));

    await sequelize.close();
})().catch((e) => {
    console.error(e);
    process.exit(1);
});