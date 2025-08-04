self.addEventListener('push', function(event) {
  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    data = { title: 'Notification', body: event.data.text() };
  }

  const title = data.title || 'Notification';
  const options = {
    body: data.message || data.body || '',
    icon: data.icon || '/icons/icon-192x192.png',
    data: data.data || {},
    actions: data.actions || [],
    badge: data.badge || '/icons/icon-72x72.png',
    requireInteraction: true,
    tag: data.id || undefined,
    // Add more options as needed
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = event.notification.data && event.notification.data.url;
  if (url) {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
    );
  }
}); 