type Props = {
  children: React.ReactNode;
};

function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      {children}

    </div>
  );
}

export default AuthLayout;