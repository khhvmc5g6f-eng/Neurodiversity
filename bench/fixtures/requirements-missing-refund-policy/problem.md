# Missing requirement: cancellation refund policy

## Scenario

Review this feature for readiness. The requirements doc and both
implementations of "cancel a booking" are below.

```md
# Requirements: Booking cancellation
Users can cancel a booking from their account page.
When a booking is cancelled, its status becomes "cancelled" and the
slot is released.
```

```ts
// api/cancelBooking.ts -- used by the account-page "Cancel" button
function cancelBooking(booking) {
  booking.status = 'cancelled';
  releaseSlot(booking.slot);
  if (hoursUntil(booking.start) > 24) refund(booking.payment);
}
```

```ts
// admin/cancelBooking.ts -- used by support staff in the admin panel
function adminCancelBooking(booking) {
  booking.status = 'cancelled';
  releaseSlot(booking.slot);
  refund(booking.payment);
}
```
