import request from '@/utils/request.js'


export function showOrdersByStatusService(status) {
    return request.get(`/admin/order/getOrdersByStatus/${status}`);
}

export function shipmentService(orderId) {
    return request.post(`/admin/order/shipment/${orderId}`);
}
export function getOrderByIdService(orderId) {
    return request.get(`/admin/order/getOrderById/${orderId}`);
}