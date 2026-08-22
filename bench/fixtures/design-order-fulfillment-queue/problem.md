# Design: order fulfillment event processing

## Design problem

Design the best architecture for processing order-fulfillment events on
an e-commerce platform. Constraints:

- Traffic is extremely bursty (a Black Friday spike can be 50x normal
  peak load for a few hours).
- No order may ever be lost, and no order may ever be fulfilled twice.
- Customers should see their order move to "processing" within about
  5 seconds of purchase, even during the traffic spike.
- The fulfillment step itself (talking to warehouse/shipping systems)
  can legitimately take longer and can fail transiently.

Propose the architecture you'd actually build. Explain your reasoning,
not just a component diagram.
