# 1. Wybieramy obraz bazowy
FROM alpine:latest

# 2. Instalujemy w nim zaleznosci niezbedne do uruchomienia "procesu glownego"
RUN apk add --update redis

# 3. Ustawienie "procesu glownego"
CMD ["redis-server"]