import {getTimeInDays, getTimeInHours, getTimeInMinutes} from '../utils';
import dayjs from 'dayjs';

export function createPointTemplate(point, destinations, pointOffers) {
  const {dateTo, dateFrom, price, type, offers, isFavorite} = point;

  const currentDestination = destinations.find((destination) => destination.id === point.destination);
  const destinationName = (currentDestination) ? currentDestination.name : '';

  const days = getTimeInDays(dateFrom, dateTo);
  const hours = getTimeInHours(dateFrom, dateTo);
  const minutes = getTimeInMinutes(dateFrom, dateTo);

  const activeFavoriteButtonTemplate = isFavorite ? 'event__favorite-btn--active' : '';

  return `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom}">${dayjs(dateFrom).format('MMM DD')}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destinationName}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom}">${dayjs(dateFrom).format('HH:mm')}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo}">${dayjs(dateTo).format('HH:mm')}</time>
        </p>
        <p class="event__duration">${days} ${hours} ${minutes}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>

      ${createPointOffersTemplate(pointOffers,offers)}

      <button class="event__favorite-btn ${activeFavoriteButtonTemplate}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
  `;
}

function createPointOffersTemplate(offers, checkedOffers) {
  return offers ?
    `<ul class="event__selected-offers">
        ${offers.offers.map((offerItem) => checkedOffers.includes(offerItem.id) ? `<li class="event__offer">
          <span class="event__offer-title">${offerItem.title}</span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">${offerItem.price}</span>
          </li>` : '').join('')}
      </ul>` : '';
}
