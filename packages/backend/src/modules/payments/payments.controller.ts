import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('stripe/create-intent')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Stripe payment intent' })
  createStripeIntent(@Body('amount') amount: number) {
    return this.paymentsService.createStripeIntent(amount);
  }

  @Post('stripe/verify')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  verifyStripe(@Body('paymentIntentId') id: string) {
    return this.paymentsService.verifyStripePayment(id);
  }

  @Post('jazzcash/callback')
  jazzCashCallback(@Body() payload: any) {
    return this.paymentsService.handleJazzCashCallback(payload);
  }

  @Post('easypaisa/callback')
  easypaisaCallback(@Body() payload: any) {
    return this.paymentsService.handleEasypaisaCallback(payload);
  }
}
