class ChatroomsController < ApplicationController
  before_action :set_chatrooms, only: %i[index create]

  def index
    @chatroom = Chatroom.new
  end

  def create
    @chatroom = Chatroom.new(chatroom_params)
    if @chatroom.save
      redirect_to chatrooms_path
    else
      render :index, status: :unprocessable_entity
    end
  end

  def show
    @chatroom = Chatroom.find(params[:id])
    @message = Message.new
  end

  private

  def set_chatrooms
    @chatrooms = Chatroom.all
  end

  def chatroom_params
    params.require(:chatroom).permit(:name)
  end
end
