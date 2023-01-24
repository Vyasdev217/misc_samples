vel=60 #Initial velocity
a=67 #Initial inclination

import math
from time import sleep
import turtle
sx=-200
sy=-200
t=turtle.Turtle()
t.speed(10)
t.hideturtle()
t.penup()
time=0
R=(vel**2)*math.sin(math.radians(2*a))/9.8
H=((vel*math.sin(math.radians(a)))**2)*0.5/9.8
t.setposition([sx,sy])
t.pendown()
t.forward(R+20)
t.setposition([sx,sy])
t.left(90)
t.forward(H+20)
t.setposition([sx,sy])

def proj(vel, angle):
    vx=vel*math.cos(math.radians(angle))
    vy=vel*math.sin(math.radians(angle))
    sx=-200
    sy=-200
    t=turtle.Turtle()
    t.hideturtle()
    t.penup()
    time=0
    t.setposition([sx,sy])
    t.pendown()
    while(sy>=-200):
        t.speed(round(10*pow((vx**2)+(vy**2),0.5)/vel))
        sx+=vx*0.1
        sy+=(vy-9.8*time)*0.1
        t.setposition([sx,sy])
        time+=0.1
t.penup()
t.setposition((-335,200))
t.pendown()
t.write("Initial veocity: "+str(vel)+"\n"+"Initial inclination: "+str(a)+" degree\n"+"Max. height: "+str(round(H,2))+"\n"+"Range: "+str(round(R,2))+"\n")
proj(vel,a)
sleep(10)
