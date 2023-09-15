// to consume

import amqp from "amqplib";
const amqpServer = "amqp://localhost:5672";
let channel: any;
let connect: any;

const connection = async (queue: string) => {
  connect = await amqp.connect(amqpServer);
  channel = await connect.createChannel();

  await channel.assertQueue(queue);

  // await channel.consume(queue, (message: any) => {
  //   console.log(message);
  // });
};

export { connect, connection, channel };
