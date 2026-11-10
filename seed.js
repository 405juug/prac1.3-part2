const { User, Post, Author, Book, Student, Course, Order, Item } = require('./models');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = async function seed() {
    const alice = await User.create({ name: 'Alice', email: 'alice@example.com', isActive: true });
    const bob = await User.create({ name: 'Bob', email: 'bob@example.com', isActive: true });
    await User.create({ name: 'Carol', email: 'carol@example.com', isActive: true });
    const dave = await User.create({ name: 'Dave', email: 'dave@example.com', isActive: false });

    await Post.create({ title: 'Alice 2022', publishedAt: '2022-05-10', status: 'published', authorId: alice.id });
    await Post.create({ title: 'Alice 2023', publishedAt: '2023-03-15', status: 'published', authorId: alice.id });
    await Post.create({ title: 'Alice 2024 draft', publishedAt: '2024-02-01', status: 'draft', authorId: alice.id });
    await Post.create({ title: 'Bob 2022', publishedAt: '2022-11-20', status: 'published', authorId: bob.id });
    await Post.create({ title: 'Dave 2024', publishedAt: '2024-06-06', status: 'archived', authorId: dave.id });

    const a1 = await Author.create({ firstName: 'Fyodor', lastName: 'Dostoevsky', country: 'Russia' });
    const a2 = await Author.create({ firstName: 'Anton', lastName: 'Chekhov', country: 'Russia' });
    await Author.create({ firstName: 'Leo', lastName: 'Tolstoy', country: 'Russia' });

    await Book.create({ title: 'Idiot', year: 1869, genre: 'novel', authorId: a1.id });
    await Book.create({ title: 'The Cherry Orchard', year: 1904, genre: 'drama', authorId: a2.id });

    const s1 = await Student.create({ name: 'Anna', group: 'A-1' });
    const s2 = await Student.create({ name: 'Boris', group: 'A-2' });

    const c1 = await Course.create({ title: 'Algorithms', credits: 5 });
    const c2 = await Course.create({ title: 'Databases', credits: 4 });
    const c3 = await Course.create({ title: 'Physical Education', credits: 2 });

    await s1.addCourses([c1, c2, c3]);
    await s2.addCourses([c3]);

    const o1 = await Order.create({ number: 'ORD-001', status: 'paid' });
    await sleep(1100);
    const o2 = await Order.create({ number: 'ORD-002', status: 'new' });

    await Item.create({ productName: 'Pen', quantity: 10, price: 1.5, orderId: o1.id });
    await Item.create({ productName: 'Notebook', quantity: 5, price: 4.0, orderId: o1.id });
    await Item.create({ productName: 'Ruler', quantity: 1, price: 2.0, orderId: o1.id });
    await Item.create({ productName: 'Laptop', quantity: 1, price: 900, orderId: o2.id });
    await Item.create({ productName: 'Cable', quantity: 3, price: 7.0, orderId: o2.id });
};