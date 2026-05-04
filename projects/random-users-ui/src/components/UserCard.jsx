function UserCard({ user }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-300">
      {/* Top Section */}
      <div className="flex flex-col items-center">
        {/* Profile Image */}
        <img
          src={user.picture.large}
          alt="user"
          className="w-24 h-24 rounded-full border-4 border-indigo-500"
        />

        {/* Name */}
        <h2 className="text-lg font-semibold mt-3 text-center">
          {user.name.title}. {user.name.first} {user.name.last}
        </h2>

        {/* Username */}
        <p className="text-sm text-gray-400">@{user.login.username}</p>

        {/* Gender Badge */}
        <span className="mt-2 px-3 py-1 text-xs bg-indigo-600 rounded-full">
          {user.gender.toUpperCase()}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 my-4"></div>

      {/* Info Section */}
      <div className="space-y-2 text-sm text-gray-300">
        <p>
          <span className="text-gray-500">📧 Email:</span> {user.email}
        </p>

        <p>
          <span className="text-gray-500">📱 Phone:</span> {user.phone}
        </p>

        <p>
          <span className="text-gray-500">📍 Location:</span>{" "}
          {user.location.city}, {user.location.country}
        </p>

        <p>
          <span className="text-gray-500">🎂 Age:</span> {user.dob.age}
        </p>

        <p>
          <span className="text-gray-500">🌍 Nationality:</span> {user.nat}
        </p>
      </div>

      {/* Flag (extra polish) */}
      <div className="flex justify-center mt-4">
        <img
          src={`https://flagcdn.com/w40/${user.nat.toLowerCase()}.png`}
          alt="flag"
          className="rounded"
        />
      </div>
    </div>
  );
}

export default UserCard;
