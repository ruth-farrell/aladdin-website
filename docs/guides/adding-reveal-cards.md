# How to Add a Card with a Reveal Item

Reveal cards are regular `card.html` components that show a **"More Info"** (or similar) button. When the button is clicked, it reveals a list of bullets and then hides the button (one-way reveal).

## Quick Start

1. Wrap your cards in a container with `data-reveals`
2. Include `website/components/shared/card.html`
3. Provide `reveal_text` and at least `reveal_bullet1`
4. Provide a unique `card_id` per card

## Basic Example

{% raw %}
```django
<div class="card__wrapper" data-reveals>
  {% include "website/components/shared/card.html" with
    image="https://aladdin.ie/files/website/images/epay-logo.webp"
    title="ePayments"
    description="Collect money for books, fees, tours and more — all within Aladdin."
    theme="epayments"
    card_id="epayments-reveal"
    reveal_text="More Info"
    reveal_bullet1="Collect credit / debit card ePayments from parents online via Aladdin."
    reveal_bullet2="Collected money is deposited directly to school bank account"
    reveal_bullet3="Flexible collection options such as payment due dates and variable amounts."
  %}
</div>
```
{% endraw %}

## How It Works

- **Container**: `data-reveals` is what the JavaScript looks for to initialize reveal behavior.
- **Card switch**: `card.html` will render a reveal button + panel when `reveal_text` and `reveal_bullet1` are provided. Otherwise it renders the CTA button.
- **Unique IDs**: `card_id` is used to generate unique IDs for `aria-controls` / panel IDs. Make sure it’s unique per card on the page.
- **One-way reveal**: clicking the button reveals the content and hides the button (no “collapse” behavior).

## Parameters (Card Reveal)

Provided via the `card.html` include:

- **`card_id`**: unique string per card (recommended)
- **`reveal_text`**: button label (e.g. `"More Info"`)
- **`reveal_bullet1`**: required to enable reveal rendering
- **`reveal_bullet2`..`reveal_bullet4`**: optional additional bullets
- **`theme`**: should match an existing theme (used for button styling)

## File Locations

- **Template (card)**: `ui/website/components/shared/card.html`
- **Template (reveal)**: `ui/website/components/shared/reveal.html`
- **JavaScript**: `ui/website/js/components/reveal.js`
- **CSS**: `ui/website/css/shared/reveal.css`

## Real-World Example

See `ui/website/components/home/add-ons.html` — it uses reveal cards for each add-on.


