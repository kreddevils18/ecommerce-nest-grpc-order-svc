import {Controller, Inject, Logger} from '@nestjs/common';
import {OrderService} from "./order.service";
import {GrpcMethod} from "@nestjs/microservices";
import {CreateOrderResponse, ORDER_SERVICE_NAME} from "./proto/order";
import {CreateOrderRequestDto} from "./order.dto";

@Controller('orders')
export class OrderController {
  @Inject(OrderService)
  private readonly service: OrderService;

  private readonly logger = new Logger(ORDER_SERVICE_NAME)

  @GrpcMethod(ORDER_SERVICE_NAME, 'CreateOrder')
  private async createOrder(data: CreateOrderRequestDto): Promise<CreateOrderResponse> {
    this.logger.log("OrderController: CreateOrderRequest")
    return this.service.createOrder(data);
  }
}
