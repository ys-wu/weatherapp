FROM python:3.11.1-slim-buster

WORKDIR /app

COPY requirements.txt ./

RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["flask", "--debug", "run", "--host=0.0.0.0"]