import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => String)
  id!: string;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => Float)
  price!: string;

  @Field()
  image!: string;

  @Field()
  stripePriceId!: string;

  @Field(() => Boolean)
  isFeatured!: boolean;

  @Field()
  createdAt!: string;

  @Field()
  updatedAt!: string;



}
