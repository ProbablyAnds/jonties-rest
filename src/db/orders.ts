import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: { type: Array<String>, required: true },
    total: { type: Number, required: true },
    paid: { type: Boolean, required: true },
});

export const OrderModel = mongoose.model('Order', OrderSchema);

export const getOrders = () => OrderModel.find();
export const getOrderById = (id: string) => OrderModel.findById(id);
export const getOrdersByUserId = (userId: string) => OrderModel.find({userId});
export const createOrder = (values: Record<string, any>) => new OrderModel(values).save().then((order) => order.toObject());
export const deleteOrderById = (id: string) => OrderModel.findByIdAndDelete(id);
export const updateOrderById = (id: string, values: Record<string, any>) => OrderModel.findByIdAndUpdate(id, values);